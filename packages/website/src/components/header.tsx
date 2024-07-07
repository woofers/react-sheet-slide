import { FaGithub, FaNpm } from 'react-icons/fa'
import { LargeText } from 'components/text'
import { Link } from 'components/helpers'
import { Emojis } from 'components/theme-mode'

export const Header: React.FC<Nothing> = () => (
  <div className="flex flex-col gap-y-4 pl-2">
    <div className="w-full flex justify-between">
      <div className="flex flex-col gap-y-4">
        <LargeText>react-sheet-slide</LargeText>
        <Emojis />
      </div>
      <div className="flex flex-col gap-x-[20px] gap-y-2 xsm:flex-row-reverse">
        <Link
          href="https://github.com/woofers/react-sheet-slide"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View on GitHub"
          title="GitHub"
        >
          <LargeText className="text-[32px]">
            <FaGithub />
          </LargeText>
        </Link>
        <Link
          href="https://www.npmjs.com/package/react-sheet-slide"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View on Node Package Manager"
          title="npm"
        >
          <LargeText className="text-[40px]">
            <FaNpm />
          </LargeText>
        </Link>
      </div>
    </div>
  </div>
)
