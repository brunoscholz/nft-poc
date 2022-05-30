import { useState } from 'react'
import { useAppState } from '../contexts/AppState'
import { mint, uploadFileToIPFS } from '../store/actions'
import { accountSelector, contractSelector } from '../store/selectors'

const Footer = () => {
  const [ state, dispatch ] = useAppState()
  const [ file, updateFileUrl ] = useState('')
  const [ name, setName ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ attributes, setAttributes ] = useState([])

  const contract = contractSelector(state)
  const account = accountSelector(state)

  async function handleSubmit(e) {
    e.preventDefault()
    // console.log(name, description, attributes, fileUrl)
    try {
      const metadata = {
        image: file,
        name: name,
        description: description,
        attributes: attributes
      }
      const Token = await uploadFileToIPFS(file, metadata)
      const nft = await mint(contract, account, Token, dispatch)
      console.log(nft)

    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  const handleChange = (e) => {
    if (["trait_type", "value"].includes(e.target.className)) {
      let attrs = [...attributes]
      attrs[e.target.dataset.id][e.target.className] = e.target.value
      console.log(attrs)
      setAttributes(oldArray => [...attrs])
    }
  }

  function onUploadImage(e) {
    const file = e.target.files[0]
    updateFileUrl(file)
  }

  const addAttribute = () => {
    setAttributes(oldArray => [...oldArray, { trait_type: '', value: '' }])
  }

  const removeAttribute = (idx) => {
    let attrs = [...attributes]
    attrs = attrs.filter((item, i) => {
      console.log(i, idx, item.trait)
      return i !== idx
    })
    console.log(attrs)
    setAttributes(oldArray => [...attrs])
  }

  return (
    <footer id="footer">
      <div className="inner">
        <section>
          <h2>Mint an NFT</h2>
          <form onSubmit={handleSubmit} onChange={handleChange}>
            <div className="fields">
              <div className="field">
                <input type="text" name="name" id="name" placeholder="Name" onChange={e => setName(e.target.value)} />
              </div>
              <div className="field">
                <textarea name="description" id="description" placeholder="Description" onChange={e => setDescription(e.target.value)}></textarea>
              </div>
              <div className="field half">
                <input type='file' name='image' onChange={onUploadImage} />
              </div>
              <div className="field">
                <h5>Attributes</h5>
                <button type="button" onClick={addAttribute}>Add Attribute</button>
              </div>
              {
                attributes.map((data, idx) => {
                  let _kid = `key-${idx}`
                  let _vid = `val-${idx}`
                  return (
                    <div key={idx}>
                      <span onClick={e => removeAttribute(idx)}>x</span>
                      <div className="field half">
                        <input
                          id={_kid}
                          name={_kid}
                          type="text"
                          data-id={idx}
                          placeholder="Key"
                          className='trait_type'
                        />
                      </div>
                      <div className="field half">
                        <input
                          id={_vid}
                          name={_vid}
                          type="text"
                          data-id={idx}
                          placeholder="Value"
                          className='value'
                        />
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <ul className="actions">
              <li><input type="submit" value="Send" className="primary" /></li>
            </ul>
          </form>
        </section>
        <section>
          <h5>Preview</h5>
          <hr />
          <h3>{ name }</h3>
          { file && <img src={URL.createObjectURL(file)} alt='' /> }
        </section>
        <ul className="copyright">
          <li>&copy; Untitled. All rights reserved</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
        </ul>
      </div>
    </footer>
  )
}

// A cat is annoyed with her surroundings
// unaware of the dangers of the forest, a kitten poses for our crew

export default Footer