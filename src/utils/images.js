// Small (800px) copy of a photo, generated next to the original in a "thumbs" folder.
export const thumbOf = (src) => src.replace(/\/([^/]+)$/, '/thumbs/$1');

// "Wooden Cabana (3)" -> "Wooden Cabana at Paradise Bungalow, Midigama, photo 3"
export const altFromTitle = (title) =>
  title.replace(/\s*\((\d+)\)$/, ' at Paradise Bungalow, Midigama, photo $1');
