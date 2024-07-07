import { Container, Description } from 'components/helpers'
import { IconBox, Flex } from 'components/flex'
import { Text } from 'components/text'

export const SheetContent: React.FC<Nothing> = () => (
  <Container>
    <Flex>
      <Text>Draggable</Text>
      <IconBox>
        <Text>⬆</Text>️
      </IconBox>
    </Flex>
    <Description>
      Can be expanded up and down by dragging the header. Or if{' '}
      <code>scrollingExpands</code> prop is set, the body of the sheet can be
      used to expand or dismiss the popup.
    </Description>
    <Flex>
      <Text>Accessible</Text>
      <IconBox>
        <Text>👪</Text>
      </IconBox>
    </Flex>
    <Description>
      Prevents focus of background elements when sheet is open. Restores focus
      to prior selected element once sheet is closed. Sets{' '}
      <code>aria-modal</code> on sheet and sets <code>aria-hidden</code> on
      background elements. <code>Esc</code> closes sheet or dialog on desktop.
    </Description>
    <Flex>
      <Text>Styled with CSS Modules</Text>
      <IconBox>
        <Text>💅</Text>
      </IconBox>
    </Flex>
    <Description>
      No need for large styled-in-js libaries, just bundle the small CSS file
      and sheet component along with your project.
    </Description>
    <Flex>
      <Text>Customizable Detents</Text>
      <IconBox>
        <Text>⚙️</Text>
      </IconBox>
    </Flex>
    <Description>
      Comes with preset detents that can be used to catch the sheet upon user
      intereaction. Import <code>{'{ detents }'}</code> with options of{' '}
      <code>large</code>, <code>medium</code> or <code>fit</code>. Or use a
      custom callback to determine detents depending on <code>maxHeight</code>,
      and <code>minHeight</code> of device.
    </Description>
  </Container>
)
