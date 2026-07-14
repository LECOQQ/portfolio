import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { EditorialImage } from '@/components/mdx/editorial-image'
import { KeyTakeaways } from '@/components/mdx/key-takeaways'
import { useMDXComponents } from '@/mdx-components'

describe('editorial MDX components', () => {
  it('renders an optimized figure with a visible description', () => {
    render(
      <EditorialImage
        src="/images/blog/article/portrait.jpg"
        alt="Portrait du diplomate."
        description="Le diplomate pendant le congrès."
        width={562}
        height={750}
      />,
    )

    expect(
      screen.getByRole('img', { name: 'Portrait du diplomate.' }),
    ).toHaveAttribute('width', '562')
    expect(screen.getByText('Le diplomate pendant le congrès.').tagName).toBe(
      'FIGCAPTION',
    )
  })

  it('emphasizes a takeaway without quotation styling', () => {
    const { container } = render(
      <KeyTakeaways>La diplomatie transforme la puissance.</KeyTakeaways>,
    )

    const takeaway = container.querySelector('aside')
    expect(takeaway).toHaveTextContent('La diplomatie transforme la puissance.')
    expect(takeaway?.querySelector('div')).toHaveClass(
      'text-site-foreground/90',
    )
    expect(takeaway?.querySelector('div')).not.toHaveClass('italic')
  })

  it('exposes both primitives to authored MDX', () => {
    const components = useMDXComponents({})

    expect(components.EditorialImage).toBe(EditorialImage)
    expect(components.KeyTakeaways).toBe(KeyTakeaways)
  })
})
