import * as yup from 'yup'
import { useFormik } from 'formik'
import { InputAdornment, TextField } from '@mui/material'

import { Button } from '../../shared/button'

import { useBeer } from '../../contexts/BeerContext'

import { FormContainer } from '../../styles/components/create-form'

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
})

export function CreateForm({ setOpenModalCreateForm }) {
  const { addBeer } = useBeer()

  const formik = useFormik({
    initialValues: {
      name: '',
      firstBrewed: '',
      abv: '',
    },
    validationSchema,
    onSubmit: (values) => {
      addBeer(values)
      setOpenModalCreateForm(false)
    },
  })

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

      <Button type="submit" text="Save" />
    </FormContainer>
  )
}
