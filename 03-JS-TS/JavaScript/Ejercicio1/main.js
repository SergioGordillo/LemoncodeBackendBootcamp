const data = `id,name,surname,gender,email,picture
15519533,Raul,Flores,male,raul.flores@example.com,https://randomuser.me/api/portraits/men/42.jpg
82739790,Alvaro,Alvarez,male,alvaro.alvarez@example.com,https://randomuser.me/api/portraits/men/48.jpg
37206344,Adrian,Pastor,male,adrian.pastor@example.com,https://randomuser.me/api/portraits/men/86.jpg
58054375,Fatima,Guerrero,female,fatima.guerrero@example.com,https://randomuser.me/api/portraits/women/74.jpg
35133706,Raul,Ruiz,male,raul.ruiz@example.com,https://randomuser.me/api/portraits/men/78.jpg
79300902,Nerea,Santos,female,nerea.santos@example.com,https://randomuser.me/api/portraits/women/61.jpg
89802965,Andres,Sanchez,male,andres.sanchez@example.com,https://randomuser.me/api/portraits/men/34.jpg
62431141,Lorenzo,Gomez,male,lorenzo.gomez@example.com,https://randomuser.me/api/portraits/men/81.jpg
05298880,Marco,Campos,male,marco.campos@example.com,https://randomuser.me/api/portraits/men/67.jpg
61539018,Marco,Calvo,male,marco.calvo@example.com,https://randomuser.me/api/portraits/men/86.jpg`;


const fromCSV = (csv) => {
    const [header, ...rows] = csv.split('\n').map(row => row.split(','));
  
    return rows.map(fields => {
      const obj = {};
      header.forEach((key, index) => {
        obj[key] = fields[index];
      });
      return obj;
    });
  };

const objData = fromCSV(data);
console.log("objData", objData);

const fromCSVExtra = (csv, nAttrs) => {
    const [header, ...rows] = csv.split('\n').map(row => row.split(','));
  
    return rows.map(fields => {
      const obj = {};
      const attributesToTake = nAttrs || header.length;
  
      header.slice(0, attributesToTake).forEach((key, index) => {
        obj[key] = fields[index];
      });
  
      return obj;
    });
  };

console.log("fromCSVExtraSin2ndParam", fromCSVExtra(data)); // Cada usuario tendrá todos los atributos como la implementación original
console.log("fromCSVExtraCon2Attr", fromCSVExtra(data, 2)); // cada usuario tendrá sólo `id` y `name`
console.log("fromCSVExtraCon3Attr", fromCSVExtra(data, 3)); // cada usuario tendrá sólo `id`, `name` y `surname`
console.log("fromCSVExtraCon4Attr", fromCSVExtra(data, 4)); // cada usuario tendrá sólo `id`, `name`, `surname` y `gender`
