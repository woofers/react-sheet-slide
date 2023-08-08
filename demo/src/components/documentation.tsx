'use client'
import { Children, useMemo, useState, useRef } from 'react'
import {
  DocsWrapper,
  Center,
  CloseButton,
  Container,
  Description
} from 'components/helpers'
import { Formik, useFormikContext, FormikProps } from 'formik'
import { ThemeButtons } from 'components/theme-mode'
import { Button } from 'components/button'
import { Text } from 'components/text'
import { trinaryToBool } from 'utils/code'
import { IconBox, Flex } from 'components/flex'
import {
  detents,
  Sheet,
  Header,
  Content,
  Footer,
  Portal
} from 'react-sheet-slide'
import { CloseIcon } from 'icons'
import { SheetContent } from 'components/sheet-content'
import { useHead } from 'hooks/use-head'
import type { FormProps } from 'types/global'

const getDetents = (id: string | number) => {
  return detents[id as keyof typeof detents]
}

const detentsData = {
  selected: [
    { id: 'large', children: 'detents.large' },
    { id: 'medium', children: 'detents.medium' }
  ],
  other: [{ id: 'fit', children: 'detents.fit' }]
}

export const Documentation: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => {
  const [open, setOpen] = useState(false)
  const openSheet = () => {
    setOpen(true)
    setDarkTitle(true)
  }
  const [darkTitle, setDarkTitle] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const useDarkMode = useHead({ darkTitle })
  return (
    <>
      <DocsWrapper>
        <Formik
          initialValues={{
            scrollingExpands: true,
            useDarkMode: 'auto',
            useModal: 'auto',
            detents: detentsData
          }}
          onSubmit={() => {}}
        >
          {({ values }: FormikProps<FormProps>) => {
            const active = values.detents.selected
            const detentsId =
              active.length > 0 ? active.map(({ id }) => id) : ['large']
            const detentsProp = detentsId
              .map(id => getDetents(id))
              .filter(detent => !!detent)
            const detentsFunc = (
              props: Parameters<(typeof detents)['large']>[0]
            ) => detentsProp.map(func => func(props))
            const selectedDetent = detentsProp[0]
            return (
              <>
                <div className="flex px-2 gap-x-9 mt-[20px] mb-2">
                  <ThemeButtons />
                  <div className="flex grow justify-center xsm:justify-start">
                    <Button
                      type="button"
                      onClick={openSheet}
                      className="grow max-w-[180px]"
                    >
                      Open sheet
                    </Button>
                  </div>
                </div>
                <Portal containerRef="#react-sheet-slide">
                  <Sheet
                    ref={ref}
                    open={open}
                    onDismiss={() => setOpen(false)}
                    onClose={() => setDarkTitle(false)}
                    selectedDetent={selectedDetent}
                    detents={detentsFunc}
                    useDarkMode={
                      trinaryToBool(values.useDarkMode) ?? useDarkMode
                    }
                    useModal={trinaryToBool(values.useModal)}
                    scrollingExpands={values.scrollingExpands}
                  >
                    <Header>
                      <div className="flex justify-between items-center gap-x-2 text-[var(--color-text)]">
                        <div className="text-lg leading-6 mx-0 tracking-normal grow font-semibold">
                          Sheet
                        </div>
                        <CloseButton
                          type="button"
                          onClick={() => setOpen(false)}
                        >
                          <CloseIcon />
                        </CloseButton>
                      </div>
                    </Header>
                    <Content>
                      <SheetContent />
                    </Content>
                    <Footer>
                      <div className="flex flex-col px-4 gap-y-2">
                        <Button type="button" onClick={() => setOpen(false)}>
                          Close
                        </Button>
                      </div>
                    </Footer>
                  </Sheet>
                </Portal>
                {children}
              </>
            )
          }}
        </Formik>
      </DocsWrapper>
      <Center>
        <Button type="button" onClick={openSheet}>
          Open sheet
        </Button>
      </Center>
    </>
  )
}
