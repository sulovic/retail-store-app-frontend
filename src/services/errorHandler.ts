
export const handleApiError = (error: any) => {
  let errorMessage = "";

  console.log("Error in API call:",error?.message)

  if (error.response?.status === 400) {
    errorMessage = "Nisu poslati podaci za upis.";
  } else if (error.response?.status === 401) {
    errorMessage = "Niste autorizovani da posetite ovu stranu.";
  } else if (error.response?.status === 403) {
    errorMessage = "Nemate ovlašćenja da izvršite ovu akciju.";
  } else if (error.response?.status === 404) {
    errorMessage = "Traženi podatak/stranica nisu pronađeni.";
  } else if (error.response?.status === 500) {
    errorMessage = "Greška na API serveru.";
  } else if (error.response?.status === 409) {
    errorMessage = "Podatak nije dodat! Ovaj podatak već postoji.";
  } else if (error.response) {
    errorMessage = `API Greška: ${error.response.status}`;
  } else if (error.request) {
    errorMessage = "Ne mogu da se povežem na API server. Molim Vas da proverite internet konekciju.";
  } else {
    errorMessage = "Neočekivana greška! Probajte ponovo kasnije...";
  }

  return errorMessage;
};
