const imagemin = require('imagemin');
const imageminSvgo = require('imagemin-svgo');
 
(async () => {
    await imagemin(['src/images/svg_unziped/*_inc.svg'],  {
        destination: 'src/images',
        plugins: [
            imageminSvgo({
                plugins: [
                    {
                        removeViewBox: false,
                        collapseGroups: false
                    }
                ]
            })
        ]
    });
 
    console.log('Images optimized');
})();