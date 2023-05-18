export function getCat(ind) {
    const cats = [
        'images.jpeg',
        'images (1).jpeg',
        'images (2).jpeg',
        'images (3).jpeg',
        'images (4).jpeg',
        'download.jpeg',
        'https://cdn.pixabay.com/photo/2022/06/27/14/38/cat-7287671_1280.jpg',
        'https://cdn.pixabay.com/photo/2020/11/15/18/31/cat-5746771__480.png',
        'https://cdn.pixabay.com/photo/2016/10/11/18/17/black-cat-1732366__480.png',
        'https://cdn.colorhub.me/BWmZJZ0Wt0g/rs:auto:0:500:0/g:ce/fn:colorhub/bG9jYWw6Ly8vNzEvNjYvNjQxNmRkNGU4YzEzODBkMTg2MzRmNDI0ZTBmYmZmOTYzZGQzNzE2Ni5qcGVn.webp',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7EihFE1ueFd_aTqNyoH09krhK--OggRiDFA&usqp=CAU',
        'https://p3.ssl.qhimg.com/t01f7d210920c0c73bd.jpg'
    ]
    const index = typeof ind === 'number' ? ind % cats.length : Math.floor(Math.random() * cats.length);
    return cats[index];
}