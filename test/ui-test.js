const { chromium } = require('playwright')
const test = require('ava')
const browserPromise = chromium.launch({
  headless: true
  // slowMo: 500
})

const path = require('path')
async function pageMacro (t, callback) {
  const browser = await browserPromise
  const page = await browser.newPage()
  await page.setViewportSize({ width: 640, height: 480 })
  try {
    await callback(t, page)
  } finally {
    await page.close()
  }
}

test('test', pageMacro, async (t, page) => {
  const filePath = await path.resolve('./demo/index.html')
  const url = 'file://' + filePath

  // Go to ./demo/index.html
  await page.goto(url)

  // Click input#querytext
  await page.click('#querytext')

  // Fill input#querytext
  await page.fill('#querytext', 'some query words')
  await page.keyboard.press('Enter')

  // ### Ava test regular highlighting
  t.deepEqual(await page.innerHTML('#itemWithHighlights p'), '<span class="hitHighlight">some</span> text that resembles a search result item with lots of nice <span class="hitHighlight">words</span> to match at least <span class="hitHighlight">some</span> of the <span class="hitHighlight">query</span> input and we can make it longer by adding even more interesting text so that maximum <span class="hitHighlight">words</span> limit gets interesting ')

  // Select max 40 words
  await page.selectOption('select#maxwords', '40')

  // ### Ava test highlighting with truncation
  t.deepEqual(await page.innerHTML('#itemWithHighlights p'), '<span class="truncated"><span class="hitHighlight">some</span> text that resembles a search </span><span class="truncated">item with lots of nice <span class="hitHighlight">words</span> to match at least <span class="hitHighlight">some</span> of the <span class="hitHighlight">query</span> input and </span>')

  // Select max 50 words again
  await page.selectOption('select#maxwords', '50')

  // Click input#querytext
  await page.click('#querytext')

  // Fill input#querytext with words that don't match
  await page.fill('#querytext', 'no hits')
  await page.keyboard.press('Enter')

  // ### Ava test no hit highlight item
  t.deepEqual(await page.innerHTML('#itemWithHighlights p'), 'some text that resembles a search result item with lots of nice words to match at least some of the query input and we can make it longer by adding even more interesting text so that maximum words limit gets interesting')

  // Select 40
  await page.selectOption('select#maxwords', '40')

  // ### Ava test no hit highlight item with truncation
  t.deepEqual(await page.innerHTML('#itemWithHighlights p'), '<span class="truncated">some text that resembles a search result item with lots of nice words to match at least some of the query input and we can make it longer by adding even more interesting text so that maximum words limit gets</span>')
})
