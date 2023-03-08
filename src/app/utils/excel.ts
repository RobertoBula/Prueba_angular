import * as xlsx from 'xlsx';

export class Excel{
    public static convertExcelToArray(file: any, callback : any) {
        let workBook = null
        let jsonData = null
        const reader = new FileReader()
        reader.onload = () => {
          const data = reader.result
          workBook = xlsx.read(data, { type: 'binary' })
          jsonData = workBook.SheetNames.reduce((initial, name) => {
            const sheet = workBook.Sheets[name]
            initial[name] = xlsx.utils.sheet_to_json(sheet)
            return initial
          }, {})
          callback(jsonData[Object.keys(jsonData)[0]].map((row) => row))
        }
        reader.readAsBinaryString(file)
      }
}