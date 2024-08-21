import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Todo from './Todo'

describe('Todo', () => {
  it('renders todo', async () => {
    const todo = { text: 'Some todo', done: false }

    render(<Todo todo={todo} />)

    expect(screen.getByTestId('text')).toBeDefined()
    expect(screen.getByTestId('done')).toBeDefined()
    
    expect(screen.findByText('Some todo')).toBeDefined()
    expect(screen.findByText('This todo is not done')).toBeDefined()
  })
})