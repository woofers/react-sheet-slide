'use client'
import { Sortable, type SetItems } from 'components/sortable'
import { Formik, useFormikContext, FormikProps } from 'formik'
import type { FormProps } from 'types/global'

export const DetentsSelector: React.FC<Nothing> = () => {
  const { values, setFieldValue } = useFormikContext<FormProps>()
  const items = values.detents
  const setItems: SetItems = data => {
    if (typeof data !== 'function') {
      setFieldValue('detents', data)
      return
    }
    setFieldValue('detents', data(items))
  }
  return <Sortable items={items} setItems={setItems} removable />
}
