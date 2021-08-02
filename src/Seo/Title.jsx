import React from 'react'
import propTypes from 'prop-types'
import {Helmet} from "react-helmet"

const Title = ({title , description}) => {

  return (
    <div>
        <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        
        <meta content={description}  name="description" />
      </Helmet>    
    </div>
  )
}

Title.defaultProps = {
  title : "please fill title",
  description:" Mapsa Movies Database "
}

Title.propTypes = {
  title:propTypes.string , 
  description:propTypes.string
}



export default Title
