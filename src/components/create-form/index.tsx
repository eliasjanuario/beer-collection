import * as yup from 'yup'
import { Dispatch, SetStateAction, useState } from 'react'
import { useFormik } from 'formik'

import { AddCircleOutline, DeleteOutline } from '@mui/icons-material'
import {
  Button,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
} from '@mui/material'

import { ImageUpload } from '../../shared/image-upload'

import { useBeer } from '../../contexts/BeerContext'

import { postBeerImage } from '../../services/beerService'

import { FormContainer } from '../../styles/components/create-form'

interface FormValues {
  name: string
  firstBrewed: string
  abv: string
  description: string
  foodPairing: string
  tips: string
}

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  firstBrewed: yup
    .string()
    // NOTE: This code snippet was not entirely written by me.
    // It includes contributions of Documentations or sections authored by others.
    .matches(
      /^(0[1-9]|1[0-2])\/(19\d{2}|20[01]\d|202[0-3])$/,
      'Invalid date format (MM/YYYY)',
    )
    // ---------------------------------------------------------------------------
    .required('First Brewed is required'),
  abv: yup
    .number()
    .min(0, 'ABV should be minimum 0')
    .required('ABV is required'),
  description: yup.string(),
  tips: yup.string(),
  foodPairing: yup.string(),
})

const initialFormValues = {
  name: '',
  firstBrewed: '',
  abv: '',
  description: '',
  foodPairing: '',
  tips: '',
}

interface CreateForm {
  setOpenModalCreateForm: Dispatch<SetStateAction<boolean>>
}

export function CreateForm({ setOpenModalCreateForm }: CreateForm) {
  const [foodPairingValue, setFoodPairingValue] = useState<string[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)

  const { addBeer } = useBeer()

  async function handleOnSubmit(values: FormValues) {
    // NOTE: This code snippet was not entirely written by me.
    // It includes contributions of Documentations or sections authored by others.
    const formData = new FormData()
    formData.append('myfile', imageFile)
    // ---------------------------------------------------------------------------

    const response = await postBeerImage(formData)

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

      addBeer(newBeerData)
      setOpenModalCreateForm(false)
    }
  }

  function handleFoodPairing(value: string): void {
    formik.values.foodPairing = ''
    setFoodPairingValue((prevFoodPairing) => [...prevFoodPairing, value])
  }

  function handleDeleteFoodPairing(index: number): void {
    const newArray = [...foodPairingValue]
    newArray.splice(index, 1)

    setFoodPairingValue(newArray)
  }

  const formik = useFormik<FormValues>({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: handleOnSubmit,
  })

  return (
    <FormContainer onSubmit={formik.handleSubmit}>
      <h3>Upload an Image to Continue</h3>

      <ImageUpload
        id="image"
        imageFile={imageFile}
        setImageFile={setImageFile}
      />

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
        disabled={!imageFile}
      />

      <div className="row">
        <TextField
          id="firstBrewed"
          label="First Brewed"
          value={formik.values.firstBrewed}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.firstBrewed && Boolean(formik.errors.firstBrewed)
          }
          helperText={formik.touched.firstBrewed && formik.errors.firstBrewed}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">MM/YYYY</InputAdornment>
            ),
          }}
          disabled={!imageFile}
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
          disabled={!imageFile}
        />
      </div>

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
        disabled={!imageFile}
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
        disabled={!imageFile}
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
              disabled={!imageFile || formik.values.foodPairing === ''}
            >
              <AddCircleOutline />
            </IconButton>
          ),
        }}
        disabled={!imageFile}
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

      {imageFile && (
        <div className="formActions">
          <Button type="submit" fullWidth>
            Save
          </Button>
        </div>
      )}
    </FormContainer>
  )
}
