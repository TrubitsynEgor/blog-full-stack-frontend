import React, { useCallback, useMemo, useRef, useState } from 'react'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import SimpleMDE from 'react-simplemde-editor'

import 'easymde/dist/easymde.min.css'
import styles from './AddPost.module.scss'
import { useSelector } from 'react-redux'
import { isAuthSelector } from '../../redux/slices/authSlice'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { createPostOnServer, fetchImageOnServer } from '../../services/posts'
import axios from '../../services/axios'

export const AddPost = () => {
  const navigate = useNavigate()
  const isAuth = useSelector(isAuthSelector)
  const [isLoading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const inputFileRef = useRef(null)

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('image', file)
      const data = await fetchImageOnServer(formData)
      setImageUrl(data.url)
    } catch (err) {
      console.warn(err)
      alert('file download failed')
    }
  }

  const onClickRemoveImage = () => {
    setImageUrl('')
  }

  const onSubmit = async () => {
    try {
      setLoading(true)

      const fields = {
        title,
        text,
        tags: tags.split(','),
        imageUrl,
      }
      const { data } = await axios.post('/posts', fields)
      navigate(`/posts/${data._id}`)
    } catch (err) {
      console.warn(err)
      alert('Created post failed')
    }
  }

  const onChange = useCallback((value) => {
    setText(value)
  }, [])

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Write your text here...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  )

  if (!localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />
  }
  return (
    <Paper style={{ padding: 30 }}>
      <div>
        <Button
          style={{ marginBottom: 20 }}
          onClick={() => inputFileRef.current.click()}
          variant="outlined"
          size="large"
        >
          Download previews
        </Button>
        <input
          onChange={handleChangeFile}
          ref={inputFileRef}
          type="file"
          hidden
        />
        {imageUrl && (
          <>
            <Button
              style={{ marginLeft: 15, marginBottom: 20 }}
              variant="contained"
              color="error"
              onClick={onClickRemoveImage}
            >
              Remove
            </Button>

            <img
              className={styles.image}
              src={`http://localhost:4444${imageUrl}`}
              alt="Uploaded"
            />
          </>
        )}
      </div>

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Post title..."
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        fullWidth
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Publish
        </Button>
        <Link to="/">
          <Button size="large">Cancel</Button>
        </Link>
      </div>
    </Paper>
  )
}
