export const createOption = (option) => {
  if (option === undefined) {
    return [];
  } else {
    return option?.map((item) => {
      return {
        id: item.id || item.idUnitKerja,
        label: item.nama || item.namaUnitKerja || item.namaCabang,
        pic: item.namaPic || '',
        email: item.emailPic || '',
      };
    });
  }
};

export const createGroupedOption = (option) => {
  if (option === undefined) {
    return [];
  } else {
    return option?.map((item) => {
      return {
        id: item.id,
        label: item.nama,
        idCategory: item.subKategori.kategoriKejadian.id,
        labelCategory:
          item.subKategori.kategoriKejadian.nama + ' - ' + item.subKategori.kategoriKejadian.kode,
        idSubCategory: item.subKategori.id,
        labelSubCategory: item.subKategori.nama,
      };
    });
  }
};
