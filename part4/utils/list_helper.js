const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {

    if (blogs.length === 0) {
        return 0
    } else {
        const array1 = blogs.map(x => x.likes)
        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        return array1.reduce(reducer)
    }
}

const favorite = (blogs) => {

    if (blogs.length === 0) {

        return 0
        
    } else {

        var max = 0;
        var index = 0;
        var i;

        for (i = 0; i < blogs.length; i++) {
            if (blogs[i].likes > blogs[index].likes) {index = i}
        }

        var splitObject = function (obj, keys) {
            var holder = {};
            keys.forEach(function (d) {
                holder[d] = obj[d];
            })
            return holder;
        }
        
        var result = splitObject(blogs[index], ['title', 'author', 'likes']);

        return result;
    }
}

const mostBlogs = (blogs) => {

    var authors = blogs.map(x => x.author)
    var mf = 1;
    var m = 0;
    var item;

    for (var i=0; i<authors.length; i++)
    {
        for (var j=i; j<authors.length; j++)
        {
            if (authors[i] == authors[j])
                m++;
            if (mf<m)
            {
                mf = m; 
                item = authors[i];
            }
        }
        m=0;
    }
    
    var result = {
        'author': item,
        'blogs': mf
    }

    return (result)

}
  
module.exports = {
    dummy,
    totalLikes,
    favorite,
    mostBlogs
}
