const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog, isDescending } = require('./helper')

describe('Bloglist', () => {
  // Before each test, we need to open the page
  beforeEach(async ({ page, request }) => {
    // Reset DB and create a user
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'John Doe',
        username: 'johndoe',
        password: 'secret'
      }
    })

    await page.goto('/')
  })

  test('Front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Blogs')
    await expect(locator).toBeVisible()
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('loginForm')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with valid credentials', async ({ page }) => {
      await loginWith(page, 'johndoe', 'secret')
      
      // Find the pop up notification verifying the login
      await expect(page.getByTestId('success')).toHaveText('John Doe logged in')
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'johndoe', 'wrong')

      const errorDiv = await page.locator('.error')    
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(errorDiv).toContainText('Invalid Username or Password')

      await expect(page.getByText('John Doe logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    // Before each test, we need to log in
    beforeEach(async ({ page }) => {
      await loginWith(page, 'johndoe', 'secret')
    })
    
    test('a new blog can be created', async ({ page }) => {
      // Find the create blog button
      await createBlog(page, 'A Playwright Blog', 'Playwright', 'https://playwright.dev/')

      await expect(page.getByTestId('success')).toHaveText('A Playwright Blog by Playwright added')
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'A Playwright Blog', 'Playwright', 'https://playwright.dev/')
      })
      
      test('blog details can be toggled', async ({ page }) => {
        // Find the blog details button 
        await expect(await page.getByTestId('blogDetails')).toBeHidden()
        await page.getByTestId('detailsButton').click()
        await expect(await page.getByTestId('blogDetails')).toBeVisible()
        await page.getByTestId('detailsButton').click()
        await expect(await page.getByTestId('blogDetails')).toBeHidden()
      })
      
      describe('and the details are visible', () => {
        beforeEach(async ({ page }) => {
          await page.getByTestId('detailsButton').click()
          await expect(await page.getByTestId('blogDetails')).toBeVisible()
        })

        test('blog can be liked', async ({ page }) => {
          // Get the like button and its container
          const likeButton = await page.getByTestId('likeButton')
          const likeDiv = await likeButton.locator('..')
          // The like button should be visible and the likes should be zero
          await expect(likeButton).toBeVisible()
          await expect(likeDiv).toContainText('Likes 0')
          // Click the like button and verify the likes are now one
          await likeButton.click()
          await expect(likeDiv).toContainText('Likes 1')
        })

        test('only the creator can delete the blog', async ({ page, request }) => {
          expect(await page.getByTestId('deleteButton')).toBeVisible()
          // Logout the user
          await page.getByTestId('logoutButton').click()

          // Create new user and log in
          await request.post('/api/users', {
            data: {
              name: 'Tim Tom',
              username: 'timtom',
              password: 'password'
            }
          })
          await expect(page.getByTestId('loginForm')).toBeVisible()
          await loginWith(page, 'timtom', 'password')
          await expect(page.getByTestId('success')).toHaveText('Tim Tom logged in')
          
          // Find the blog details button 
          await page.getByTestId('detailsButton').click()
          await expect(await page.getByTestId('blogDetails')).toBeVisible()

          // Delete button should be hidden
          expect(await page.getByTestId('deleteButton')).toBeHidden()

        })
      })
    })

    describe('and several blogs exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'A Playwright Blog', 'Playwright', 'https://playwright.dev/')
        await createBlog(page, 'A Vitest Blog', 'Vitest', 'https://vitest.dev/')
      })
      
      test("a particular blog details can be toggled", async ({ page }) => {
        // Find the blog details button 
        await page.getByText('A Vitest Blog').getByTestId('detailsButton').click()
        await expect(await page.getByText('A Vitest Blog').getByTestId('blogDetails')).toBeVisible()
      })

      
      test("a particular blog can be liked", async ({ page }) => {
        await page.getByText('A Vitest Blog').getByTestId('detailsButton').click()
        await expect(await page.getByText('A Vitest Blog').getByTestId('blogDetails')).toBeVisible()
        // Get the like button and its container
        const likeButton = await page.getByTestId('likeButton')
        const likeDiv = await likeButton.locator('..')
        // The like button should be visible and the likes should be zero
        await expect(likeButton).toBeVisible()
        await expect(likeDiv).toContainText('Likes 0')
        // Click the like button and verify the likes are now one
        await likeButton.click()
        await expect(likeDiv).toContainText('Likes 1')
      })

      test('they are ordered by likes', async ({ page }) => {
        // Open the details of a particular blog and like it
        await page.getByText('A Vitest Blog').getByTestId('detailsButton').click()
        await expect(await page.getByText('A Vitest Blog').getByTestId('blogDetails')).toBeVisible()
        const likeButton = await page.getByTestId('likeButton')
        const likeDiv = await likeButton.locator('..')
        await expect(likeButton).toBeVisible()
        await expect(likeDiv).toContainText('Likes 0')
        await likeButton.click()
        await expect(likeDiv).toContainText('Likes 1')
        
        // Close the details of the blog to avoid interference
        await page.getByText('A Vitest Blog').getByTestId('detailsButton').click()
        
        // Get all the blogs
        const blogs = await page.getByTestId('blog')
        const blogCount = await blogs.count();
        const likeArray = [];

        for (var index = 0; index < blogCount ; index++) {
            const blog = await blogs.nth(index);
            await blog.getByTestId('detailsButton').click()
            await expect(await blog.getByTestId('blogDetails')).toBeVisible()

            // Get the like button and its container
            const likeButton = await page.getByTestId('likeButton')
            const likeDiv = await likeButton.locator('..')

            // Use regex to get the likes and push them to the array
            const likes = await likeDiv.innerText();
            const regex = /\d+/g;
            likeArray.push(likes.match(regex)[0]);

            // Close the details of current blog to avoid interference
            await blog.getByTestId('detailsButton').click()
        }

        const descendCheck = isDescending(likeArray)
        await expect(descendCheck).toBe(true)
      })
    })
  })
})