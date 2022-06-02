import { useState } from 'react'
import Web3 from 'web3'
import { useAppState } from '../contexts/AppState'
import { mint, uploadFileToIPFS } from '../store/actions'
import { accountSelector, contractSelector } from '../store/selectors'

const Mint = () => {
  const [ state, dispatch ] = useAppState()
  const [ file, updateFileUrl ] = useState('')
  const [ name, setName ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ attributes, setAttributes ] = useState([])
  const [ price, setPrice ] = useState('100000000000')

  // unaware of the dangers, a kitten poses for our crew
  const contract = contractSelector(state)
  const account = accountSelector(state)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const metadata = {
        image: file,
        name: name,
        description: description,
        attributes: attributes
      }
      const Token = await uploadFileToIPFS(file, metadata)
      const nft = await mint(contract, account, Token, dispatch, price)
      // if ()
      // todo: redirect if correct
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  const handlePrice = (e) => {
    let value = e.target.value
    setPrice(Web3.utils.toWei(value))
  }

  const handleChange = (e) => {
    if (["trait_type", "value"].includes(e.target.className)) {
      let attrs = [...attributes]
      attrs[e.target.dataset.id][e.target.className] = e.target.value
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
      return i !== idx
    })
    setAttributes(oldArray => [...attrs])
  }

  return (
    <div id="main">
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
              <div className="field half input-group">
                <input type="text" name="price" id="price" placeholder="Initial Price" onChange={handlePrice} />
                <span className="input-group-text" id="basic-addon2">ETH</span>
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
                    <div key={idx} className="field">
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
      </div>
    </div>
  )
}

export default Mint
