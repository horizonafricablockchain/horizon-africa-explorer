document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    let skip = parseInt(urlParams.get('skip')) || 0;
    let limit = parseInt(urlParams.get('limit')) || 25;
    const address = urlParams.get('address');
        
    const updatePaginationLinks = () => {
        const prevLink = document.querySelector('.pagination .btn-prev');
        const nextLink = document.querySelector('.pagination .btn-next');
        if (skip > 0) {
            prevLink.href = `/address/${address}?skip=${skip - limit}&limit=${limit}`;
            prevLink.style.display = 'inline-block';
        } else {
            prevLink.style.display = 'none';
        }
        if (transactions.length === limit) {
            nextLink.href = `/address/${address}?skip=${skip + limit}&limit=${limit}`;
            nextLink.style.display = 'inline-block';
        } else {
            nextLink.style.display = 'none';
        }
    };

    updatePaginationLinks();
});