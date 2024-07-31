const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'Log in' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'New Blog' }).click()
  await page.getByTestId('titleInput').fill(title)
  await page.getByTestId('authorInput').fill(author)
  await page.getByTestId('urlInput').fill(url)
  await page.getByTestId('addBlogButton').click()
  await page.getByTestId('closeTogglable').click()
  await page.getByTestId('blog').getByText(title).waitFor()
}

function isDescending(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] <= arr[i + 1]) {
          return false;
      }
  }
  return true;
}

export { loginWith, createBlog, isDescending }