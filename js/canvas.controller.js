'use strict'

var gElCanvas

function drawText(text, color, size, font = 'times', align, lineIdx) {
    const meme = getMeme()
    gCtx.lineWidth = 1
    gCtx.strokeStyle = `white`
    gCtx.fillStyle = `${color}`
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = `${align}`
    gCtx.textBaseline = 'middle'
    const x = meme.lines[lineIdx].x
    const y = meme.lines[lineIdx].y
    gCtx.strokeText(text, x, y)
    gCtx.fillText(text, x, y)

    if (lineIdx === meme.selectedLineIdx) {
        drawLineBorder(lineIdx)
      }
}

function drawLineBorder(lineIdx) {
    const line = getLine(lineIdx)
    const metrics = gCtx.measureText(line.txt)
    const txtWidth = metrics.width
    const fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
    const x = line.x - txtWidth / 2 - 10
    const y = line.y - fontHeight / 2 - 10
    const width = txtWidth + 20
    const height = fontHeight + 20
  
    gCtx.beginPath()
    gCtx.lineWidth = '3'
    gCtx.strokeStyle = 'white'
    gCtx.rect(x, y, width, height)
    gCtx.stroke()
  }


function onLineHeightChange(diff) {
    const meme = getMeme()
    const lineIdx = meme.selectedLineIdx
    const line = getLine(lineIdx)
    line.diff += diff
    setTxtPos(lineIdx)
    renderMeme()
}

function setTxtPos(lineIdx) {
    const line = getLine(lineIdx)
    switch (lineIdx) {
        case 0:
            line.x = 50
            line.y = 50 + line.diff
            if (line.y < 50) {
                line.y = 50
                line.diff = 0
            }
            else if (line.y >= gElCanvas.height - 50) {
                line.y = gElCanvas.height - 50
                line.diff = 0
            }
            break

        case 1:
            line.x = 150
            line.y = gElCanvas.height - 50 + line.diff
            if (line.y < 50) {
                line.y = 50
                line.diff = 0
            }
            else if (line.y >= gElCanvas.height - 50) {
                line.y = gElCanvas.height - 50
                line.diff = 0
            }
            break

        default:
            line.x = gElCanvas.width / 2
            line.y = gElCanvas.height / 2 + line.diff
            if (line.y < 50) {
                line.y = 50
                line.diff = 0
            }
            else if (line.y >= gElCanvas.height - 50) {
                line.y = gElCanvas.height - 50
                line.diff = 0
            }
            break
    }
}

// add emoji to the img
function addEmoji(elBtn) {
    gMeme.lines.push({
        txt: `${elBtn.innerText}`,
        size: 50,
        align: 'center',
        color: 'black',
        diff: 0,
        x: gElCanvas.height / 2,
        y: gElCanvas.width / 2,
    })
}

function changeFontName(fontName) {
    gMeme.font = fontName
}

function setColor(newColor) {
    gMeme.lines[gMeme.selectedLineIdx].color = newColor
}
function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function getEmojis() {
    const startIdx = gPageIdx * PAGE_SIZE
    return gEmojis.slice(startIdx, startIdx + 3)
}

function getLineTxt() {
    const idx = gMeme.selectedLineIdx
    return gMeme.lines[idx].txt
}

function getLine(idx) {
    return gMeme.lines[idx]
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}
