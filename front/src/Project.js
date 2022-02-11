import React from 'react'

class Project extends React.Component{
render(){
    const {item}=this.props
    this.Select = () => {
        this.props.onSelect(this.props.item.id)
    }
    return (
        <div>
            <button style={{display: 'inline',
    fontStyle: 'italic',
    justifyContent: 'center',
    alignItems: 'center',
   width:'150px',
    margin:'10px',
    height: '30px',
    borderRadius: '6px',
    border: '3px solid rgb(76, 80, 80)',
    textAlign: 'center',
    fontSize:'18px',
    backgroundColor: '#ffff66',
    fontFamily: 'Consolas'}} onMouseOver="this.style.color='#cc9900'" className="butoaneProiecte" onClick={this.Select}>{item.title}</button>
        </div>
    )
}
}
export default Project