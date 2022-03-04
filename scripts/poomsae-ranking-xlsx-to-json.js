import fs from 'fs';
import xlsx from 'node-xlsx';
import path from 'path';

const DEFAULT_ROW_LENGTH = 11;
const filepath = path.join('static', 'data', 'PoomsaeFebruaryPosting.xlsx');
const worksheets = xlsx.parse(filepath);


function getHeaders(worksheet) {
  return worksheet.data[4].map(header => {
    return header.replace(/[^a-zA-Z]/g,'').toLowerCase();
  });
}

function extractData(worksheet) {
  const data = [];
  const headers = getHeaders(worksheet);
  for (let i = 5; i < worksheet.data.length; i++) {
    let row = worksheet.data[i];
    let obj = {};
    for (let j = 0; j < headers.length; j++) {
      if (headers[j]) {
        obj[headers[j]] = row[j];
      }
    }
    if (obj.name) {
      data.push(obj);
    }
  }
  return data;
}


// initialize data arrays
const recognized = extractData(worksheets[0]);
const freestyle = extractData(worksheets[1]);

fs.writeFileSync('recongnized.json', JSON.stringify(recognized));
fs.writeFileSync('freestyle.json', JSON.stringify(freestyle));
