import Box, { type BoxProps } from 'components/box'
import { clsx, cva, type VariantProps } from 'cva'

const button = cva(
  [
    'border-none',
    'h-11',
    'px-4 py-2',
    'rounded-[10px]',
    'font-semibold',
    'text-base',
    '!leading-4',
    'tracking-normal',
    '[transition:background-color_0.3s_ease-in-out]',
    '[&[aria-pressed]]:transition-none',
    '[&[aria-pressed="false"]]:bg-transparent'
  ],
  {
    variants: {
      theme: {
        primary: [
          'bg-[var(--color-primary)]',
          'text-[var(--color-button-text)]',
          'hover:bg-[var(--color-primary-hover)]'
        ],
        secondary: [
          'bg-[var(--color-secondary)]',
          'text-[var(--color-text)]',
          'hover:bg-[var(--color-secondary)]'
        ]
      }
    },
    defaultVariants: {
      theme: 'primary'
    }
  }
)

export const Button: React.FC<
  BoxProps<'button'> & VariantProps<typeof button>
> = ({ className, as = 'button', theme, ...rest }) => (
  <Box
    {...rest}
    as={as}
    theme={theme}
    className={clsx(button({ theme }), className)}
  />
)
