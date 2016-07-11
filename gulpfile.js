var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('default', function () {
    return gulp.src('components/**/*.js').pipe(webpack({
        watch: true,
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    loader: 'babel',
                    query: {
                        presets: ['react','es2015']
                    }
                },
                {
                    test: /\.css$/,
                    exclude: /(DateRange)/,
                    loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[local]__[hash:base64:5]'
                },
                {
                    test: /\.css$/,
                    include: /(DateRange)/,
                    loader: 'style-loader!css-loader'
                },
                { test: /\.png$/, loader: "url-loader?limit=1000&name=[path][name].[ext]" },
                { test: /\.jpg$/, loader: "file-loader" }
            ]
        }
    }))
        .pipe(gulp.dest('lib/'));
})