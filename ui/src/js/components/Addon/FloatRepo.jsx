import React from 'react'
import { repoURL } from '../../util/constants'
import { Button } from 'semantic-ui-react'

class FloatRepo extends React.Component {
  render () {
    const style = (
      <style>{`
      @keyframes back-to-docs {
          0% { transform: translateY(0); }
          50% { transform: translateY(0.35em); }
          100% { transform: translateY(0); }
      }
    `}</style>
    )

    const sourceButtonStyle = {
      position: 'fixed',
      margin: '2em',
      bottom: 0,
      left: 0,
      animation: 'back-to-docs 1.5s ease-in-out infinite',
      zIndex: 6,
    }

    return (
      <div>
        {style}
        <div style={sourceButtonStyle}>
          <Button
            as='a'
            href={`${repoURL}/tree/master/adminPoc/ui/`}
            icon='gitlab'
            color='orange'
            content='Source'
            target='_blank'
          />
        </div>
      </div>
    )
  }
}

export default FloatRepo;
