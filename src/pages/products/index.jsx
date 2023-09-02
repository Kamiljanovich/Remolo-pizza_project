import React, { useRef, useState } from 'react'
import { PageHeader, Table, Drawer, Modal, FormGroup, TextArea, Select } from '../../components/index'
import { useDispatch, useSelector } from 'react-redux' 
import { useEffect } from 'react'
import { getProducts } from '../../redux/actions/categoryActions'
import { addProduct, deleteProduct, editProduct } from '../../redux/actions/productsActions'
import Loader from '../../components/ui/Loader'
import { AlertModal } from '../../components/ui/AlertModal'
import { generateObjData, setFormValues } from '../../helpers/helpers'

export const ProductsPage = () => {

  const {products, categories} = useSelector((state) => state)
  const {items, loading} = products
  const {items: categoryItems} = categories
  const [isEdit, setIsEdit] = useState(null)
  const [isAdd, setIsAdd] = useState(null)
  const [setAlert, isSetAlert] = useState()
  const [formLoading, setFormLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [ModalOpen, SetModalOpen] = useState(false)
  const dispatch = useDispatch()
  const form = useRef()
  const tableColumns = [
    {title: 'Name',dataKey: 'name',},
    {title: 'Price',dataKey: 'price',}, 
    {title: 'Category',dataKey: 'category',},
    {title: 'Action',
    render: (el) => {
      return (
        <div className='space'>
        <button onClick={() => handleEdit(el)}>
          Edit
        </button>
        <button onClick={() => handleDeleteButton(el)}>
          Delete
        </button>
        </div>
      )
    },
    }
  ]

  useEffect(() => {
    dispatch(getProducts())
  }, [])
  // const data = [
  //   {
  //       "id": 1,
  //       "name": "Pizza muzzarella",
  //       "description": "",
  //       "price": "1200.00",
  //       "discount": null,
  //       "rating": null,
  //       "image": "https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
  //       "category": 1
  //   },
  //   {
  //       "id": 2,
  //       "name": "Pizza pepperoni",
  //       "description": "",
  //       "price": "1200.00",
  //       "discount": null,
  //       "rating": null,
  //       "image": "https://galbanicheese.com/wp-content/uploads/2019/09/Fresh-Mozzarella-Margherita-Pizza-72DPI-800x600.jpg",
  //       "category": 1
  //   },
  // ]

  const openAlert = () => {
      isSetAlert(true)
      setTimeout(isSetAlert, 3.5 * 1000);
  }

  const handleOpen = () =>{
    setModalOpen(true)
  }

  const handleClose = () =>{
    setModalOpen(false)
    resetForm()
    setIsEdit(null)
  }

  const HandleOpen = () =>{
    SetModalOpen(true)
  }

  const HandleClose = () =>{
    SetModalOpen(false)
  }

  const resetForm = () => {
    form.current.reset()
  }


  const handleEdit = (el) => {
    setFormValues(el, form)
    handleOpen()
    setIsEdit(el.id)
  }

  const handleDeleteButton = (el) => {
    SetModalOpen(true)
    setIsEdit(el.id)
  }

  const handleDelete = async (e) => {
    setFormLoading(true)
    const response = await deleteProduct(isEdit)
    if(response === 204){
      setFormLoading(false)
      setIsEdit(null)
      SetModalOpen(false)
      dispatch(getProducts())
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const obj = generateObjData(e)
    setFormLoading(true)
    const response = isEdit ? await editProduct(obj, isEdit) : await addProduct(obj)
    if(response.id){
      setIsAdd(true)
      handleClose()
      setFormLoading(false)
      dispatch(getProducts())
      openAlert()
    }
  }

  return (  
    <div className='products'>
      <div className="products-container">
        <PageHeader title={'Products'} children={
        <div className='space'>
          <button onClick={handleOpen}>Add Product</button>
          <button>Refresh</button>
        </div>}/>
        <Table columns={tableColumns} data={items} loading={loading}/>
        <Drawer open={modalOpen} onClose={handleClose} title='Add Products'>
          <form onSubmit={handleSubmit} ref={form}>
            <FormGroup label="Name" name="name" required={true}/>
            <FormGroup label="Price" type='number' name="price" required={true}/> 
            <FormGroup label="Discount" type='number' name="discount" required={true}/>
            <FormGroup label="Rating" type='number' name="rating" required={true}/>
            <TextArea label="Description"  name="description"  required={true}/>
            <FormGroup label="Image" type='url' name="image" required={true}/>
            <Select name="category" options={categoryItems.map(item => ({label: item.name, value: item.id}))} defaultValue={1} />
            <div className="form-group btn">
              <input  type='submit' disabled={formLoading} value={formLoading ? <Loader/> : isEdit ? 'Edit' : 'Add'}/>
            </div>
          </form>
        </Drawer> 
        <Modal open={ModalOpen} onClose={HandleClose} onOk={handleDelete} loading={formLoading} />
        <AlertModal open={setAlert}  title="✓ Product qoshildi" />
      </div>
    </div>
  )
}
