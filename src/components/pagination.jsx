import _ from 'lodash'

const Pagination = props => {
    const {itemsCount, pageSize, onPageChange, currentPage} = props;

    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null
    const pages = _.range(1, pagesCount + 1);
    return <nav>
        <ul className="pagination">
            {
                pages.map(page =>
                    <li className={"page-item " + ((currentPage === page) ? "active" : "")} key={page}>
                        <a onClick={() => onPageChange(page)} className="page-link">{page}</a>
                    </li>)
            }


        </ul>
    </nav>
}


export default Pagination
