import React, { useState } from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import { list } from '@freesewing/pattern-info'
import capitalize from '@freesewing/utils/capitalize'
import Filter from '../../components/designs/filter'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import PostPreview from '../../components/post-preview'

const Page = (props) => {
  const app = useApp(false)

  console.log(list)

  const [designs, setDesigns] = useState(list)
  const [filter, setFilter] = useState(false)

  const style = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }

  return (
    <AppWrapper app={app} title={app.translate('app.designs')} slug={props.path} wide>
      {filter ? (
        <Filter app={app} applyFilter={setDesigns} closeFilter={() => setFilter(false)} />
      ) : (
        <p style={{ textAlign: 'right' }}>
          <Button onClick={() => setFilter(!filter)} variant="outlined">
            <SearchIcon style={{ marginRight: '0.5rem' }} />
            <FormattedMessage id="filter.filter" />
          </Button>
        </p>
      )}
      <div style={style.wrapper}>
        {designs.map((design) => (
          <PostPreview
            designs
            key={design}
            app={app}
            img={{
              src: '/designs/' + design + '.jpg',
              alt: capitalize(design)
            }}
            title={capitalize(design)}
            description={app.translate('patterns.' + design + '.description')}
            link={'/designs/' + design + '/'}
            caption={design}
            width={200}
          />
        ))}
      </div>
    </AppWrapper>
  )
}

export default Page
