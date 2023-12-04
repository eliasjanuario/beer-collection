import * as yup from 'yup'
import { useFormik } from 'formik'
import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
} from '@mui/material'

import { Button } from '../../shared/button'

import { useBeer } from '../../contexts/BeerContext'

import { FormContainer } from '../../styles/components/create-form'
import { AddCircleOutline, DeleteOutline } from '@mui/icons-material'
import { useState } from 'react'

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  firstBrewed: yup
    .string()
    .matches(
      /^(0[1-9]|1[0-2])\/(19\d{2}|20[01]\d|202[0-3])$/,
      'Invalid date format (MM/YYYY)',
    )
    .required('First Brewed is required'),
  abv: yup
    .number()
    .min(0, 'ABV should be minimum 0')
    .required('ABV is required'),
  description: yup.string(),
  tips: yup.string(),
  foodPairing: yup.string(),
})

export function CreateForm({ setOpenModalCreateForm }) {
  const [foodPairingValue, setFoodPairingValue] = useState([])
  const [imageFile, setImageFile] = useState<File>()

  const { addBeer } = useBeer()

  const formik = useFormik({
    initialValues: {
      name: '',
      firstBrewed: '',
      abv: '',
      description: '',
      foodPairing: '',
      tips: '',
      imageUrl: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (imageFile) {
        const formData = new FormData()
        formData.append('myfile', imageFile)

        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const image = await response.text()
          const cleanImageName = image.replace(/"/g, '')

          const newBeerData = {
            name: values.name,
            firstBrewed: values.firstBrewed,
            abv: values.abv,
            description: values.description,
            foodPairing: foodPairingValue,
            tips: values.tips,
            imageUrl: `http://localhost:3000/images/${cleanImageName}`,
          }

          console.log(newBeerData)
          addBeer(newBeerData)
          setOpenModalCreateForm(false)
        }
      }
    },
  })

  function handleFoodPairing(value) {
    formik.values.foodPairing = ''
    setFoodPairingValue((prevFoodPairing) => [...prevFoodPairing, value])
  }

  function handleDeleteFoodPairing(index) {
    const newArray = [...foodPairingValue]
    newArray.splice(index, 1)

    setFoodPairingValue(newArray)
  }

  return (
    <FormContainer onSubmit={formik.handleSubmit}>
      <h3>Add New Customer Beer</h3>

      <TextField
        id="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        id="firstBrewed"
        label="First Brewed"
        value={formik.values.firstBrewed}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.firstBrewed && Boolean(formik.errors.firstBrewed)}
        helperText={formik.touched.firstBrewed && formik.errors.firstBrewed}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">MM/YYYY</InputAdornment>,
        }}
      />

      <TextField
        id="abv"
        label="ABV"
        value={formik.values.abv}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.abv && Boolean(formik.errors.abv)}
        helperText={formik.touched.abv && formik.errors.abv}
        type="number"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        id="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.abv && formik.errors.abv}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        id="tips"
        label="Tips"
        value={formik.values.tips}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.tips && Boolean(formik.errors.tips)}
        helperText={formik.touched.abv && formik.errors.abv}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        id="foodPairing"
        label="Food Pairing"
        value={formik.values.foodPairing}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Add a Food Pairing"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: (
            <IconButton
              aria-label="search"
              onClick={() => handleFoodPairing(formik.values.foodPairing)}
            >
              <AddCircleOutline />
            </IconButton>
          ),
        }}
      />

      {foodPairingValue?.length > 0 && (
        <List>
          <h4>List of Food Pairing</h4>
          {foodPairingValue.map((food, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteOutline
                    onClick={() => handleDeleteFoodPairing(index)}
                  />
                </IconButton>
              }
            >
              {food}
            </ListItem>
          ))}
        </List>
      )}

      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0]
          setImageFile(file)
        }}
      />

      <Button type="submit" text="Save" />
    </FormContainer>
  )
}
