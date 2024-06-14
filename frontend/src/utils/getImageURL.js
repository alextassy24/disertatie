export function getImageURL(name, extension = 'png') {
    return new URL(`../assets/${name}.${extension}`, import.meta.url).href;
}
