/**
 * Copyright (c) Hathor Labs and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactPaginate from 'react-paginate';


class HathorPaginate extends React.Component {
  render() {
    return (
      <ReactPaginate previousLabel={"Previous"}
         nextLabel={"Next"}
         pageCount={this.props.pageCount}
         marginPagesDisplayed={1}
         pageRangeDisplayed={2}
         onPageChange={this.props.onPageChange}
         containerClassName={"pagination justify-content-center"}
         subContainerClassName={"pages pagination"}
         activeClassName={"active"}
         breakClassName="page-item"
         breakLabel={<a className="page-link">...</a>}
         pageClassName="page-item"
         previousClassName="page-item"
         nextClassName="page-item"
         pageLinkClassName="page-link"
         previousLinkClassName="page-link"
         nextLinkClassName="page-link" />
    );
  }
}

export default HathorPaginate;