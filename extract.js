const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const sharp = require('sharp');
const path = require('path');

async function extractImageFromPdf(pdfPath) {
  const pathToExtract = "./extractedImg/"; // folder in project where all the images from pdf would be extracted
  try {
    const images = await PDF.sharpsFromPdf(pdfPath);
    images.forEach(({ image, name, channels }) => {
      const ext = '.png'; // can be use other extensions conditionally
      image.toFile(pathToExtract + `${name}${ext}`);
    });

    // Progress events
    await PDF.sharpsFromPdf(pdfPath, {
      handler(event, data) {
        if (event === 'loading') {
          console.log('Loading PDF:', (data.loaded / data.total) * 100);
        } else if (event === 'loaded') {
          console.log('PDF loaded');
        } else if (event === 'image' || event === 'skip' || event === 'error') {
          console.log('Parsing images:', (data.pageIndex / data.pages) * 100);
        } else if (event === 'done') {
          console.log('Done');
        }
      },
    });
    return pathToExtract;
  } catch (error) {
    console.error('Error extracting images from PDF:', error);
  }
}