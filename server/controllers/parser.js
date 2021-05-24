import fs from 'fs';

export function readAndDelFile(path, enctype){
  const moviesfile = fs.readFileSync(path, enctype, (err, data) => {
    if (err) throw err;
  });
  fs.unlink(path, err => {
    if (err) throw err;
  })
  return moviesfile;
}

export function parseData(fileData){
  const films = [];
  const _title = "Title: ",
        _year = "Release Year: ",
        _format = "Format: ",
        _stars = "Stars: ";

    let title, year, format, stars;
    let titleInd, yearInd, formatInd, starsInd;

    titleInd = fileData.indexOf(_title);

    while(titleInd < fileData.length){
      yearInd = fileData.indexOf(_year, titleInd);
      title = fileData.substring(titleInd + _title.length, yearInd - 1);

      formatInd = fileData.indexOf(_format, yearInd);
      year = fileData.substring(yearInd + _year.length, formatInd - 1);

      starsInd = fileData.indexOf(_stars, formatInd);
      format = fileData.substring(formatInd + _format.length, starsInd - 1)

      titleInd = titleInd = fileData.indexOf(_title, starsInd);
      if(titleInd == -1) titleInd = fileData.length + 1;
      stars = fileData.substring(starsInd + _stars.length, titleInd - 1)
      films.push({title, year, format, stars})
      
    }
    return films
}