export function getProductImageURL(name, extension){
    return new URL(`../assets/product/${name}.${extension}`, import.meta.url)
        .href;
};