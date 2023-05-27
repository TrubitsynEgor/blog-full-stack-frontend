import React, { useEffect } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'

import { Post } from '../components/Post'
import { TagsBlock } from '../components/TagsBlock'
import { CommentsBlock } from '../components/CommentsBlock'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, fetchTags } from '../redux/slices/postsSlice'

export const Home = () => {
  const dispatch = useDispatch()
  const { posts, tags } = useSelector((state) => state.posts)
  const postsIsLoading = posts.status === 'loading'
  const tagsIsLoading = tags.status === 'loading'
  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
  }, [])

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(postsIsLoading ? [...Array(5)] : posts.items).map((item, idx) =>
            postsIsLoading ? (
              <Post key={idx} isLoading={true} />
            ) : (
              <Post
                key={item._id}
                _id={item._id}
                title={item.title}
                imageUrl={item.imageUrl}
                user={item.user}
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                commentsCount={3}
                tags={item.tags}
                isEditable
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={tagsIsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  )
}
