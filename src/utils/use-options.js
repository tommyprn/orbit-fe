export const createOption = (option, ssl) => {
  if (option === undefined) {
    return [];
  } else {
    return option?.map((item) => {
      return {
        id: item.id || item.idUnitKerja,
        label: ssl
          ? `${item.kode} - ${item.nama}`
          : item.nama || item.namaUnitKerja || item.namaCabang || item.namaRegion,
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

export const createIdOption = (data) => {
  if (data === undefined) {
    return [];
  } else {
    return data?.map((item) => {
      return {
        id: item.id || item.kodeIndukCabang,
        label: item.idLaporan || item.namaIndukCabang || item.namaRegion,
      };
    });
  }
};
