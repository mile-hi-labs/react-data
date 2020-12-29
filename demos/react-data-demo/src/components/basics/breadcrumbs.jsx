import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Pluralize from 'pluralize';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Container, Row, Col } from 'components/basics/grids';
import { BasicTooltip } from 'components/basics/tooltips';
import { capitalize } from 'utils/transforms';
import { logger } from 'utils/helpers';

const BreadcrumbsWrapper = (props) => {
  const { history, location, className } = props;
  const [ breadcrumbs, setBreadcrumbs ] = useState([]);


  // Hooks
  useEffect(() => {
    setBreadcrumbs(location.pathname.split('/'));
  }, []);


  // Render
  return (
    <Breadcrumb>
      {breadcrumbs.map((breadcrumb, index) => {
        const detailBreadcrumb = index > 0 && Pluralize.singular(breadcrumbs[index - 1]);
        const active = breadcrumbs.length == index + 1;

        if (breadcrumb.match(/[0-9]/g)) {
          return (
            <Breadcrumb.Item
              key={index}
              active={active}
              linkAs={Link}
              linkProps={{to: `/${breadcrumbs[index - 1]}/${breadcrumb}`}}>
              {capitalize(detailBreadcrumb + ' #' + breadcrumb)}
            </Breadcrumb.Item>
          )
        }
        return (
          <Breadcrumb.Item
            key={index}
            active={active}
            linkAs={Link}
            linkProps={{to: index == 0 ? '/' : `/${breadcrumb}`}}>
            {capitalize(index == 0 ? 'index' : breadcrumb)}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

const MktBreadcrumbs = withRouter(BreadcrumbsWrapper);

export { MktBreadcrumbs }
