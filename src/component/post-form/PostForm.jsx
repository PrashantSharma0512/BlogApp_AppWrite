import React, { useCallback,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from '../index'
import appwriteService from '../../appWrite/configDB'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function PostForm({post}) {
  const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active',
    }
  })
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null
      if (file) {
        appwriteService.deleteFile(post.featuredImage)
      }
      const dbpost = await appwriteService.updatePost(post.$id, {
        ...data,
        featureImage: file ? file.$id : undefined,
      })
      if (dbpost) {
        navigate(`/post/${dbpost.$id}`)
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0])
      if (file) {
        const fileId = file.$id
        data.featureImage = fileId
        const dbpost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        })
        if (dbpost) {
          navigate(`/post/${dbpost.$id}`)
        }
      }
    }
  }

  const slugTransform = useCallback(
    (value) => {
      return value
        .trim()
        .lowerCase()
        .replace(/^[a-zA-Z\d\s]/g, '-')
        .replace(/\s/g, '-')
      return ''  
    }, [])
    useEffect(() => {
     const Subscription = watch((value,{name})=>{
        if (name === 'title') {
          setValue('slug',slugTransform(value.title,{shouldValidate: true}))          
        }
     })
     return ()=>{
      Subscription.unsubscribe()
     }
    }, [watch,slugTransform,setValue])
    

    return (
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
          <div className="w-2/3 px-2">
              <Input
                  label="Title :"
                  placeholder="Title"
                  className="mb-4"
                  {...register("title", { required: true })}
              />
              <Input
                  label="Slug :"
                  placeholder="Slug"
                  className="mb-4"
                  {...register("slug", { required: true })}
                  onInput={(e) => {
                      setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                  }}
              />
              {/* RTE-> Real Time Editor */}
              <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
          </div>
          <div className="w-1/3 px-2">
              <Input
                  label="Featured Image :"
                  type="file"
                  className="mb-4"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("image", { required: !post })}
              />
              {post && (
                  <div className="w-full mb-4">
                      <img
                          src={appwriteService.getFilePreview(post.featuredImage)}
                          alt={post.title}
                          className="rounded-lg"
                      />
                  </div>
              )}
              <Select
                  options={["active", "inactive"]}
                  label="Status"
                  className="mb-4"
                  {...register("status", { required: true })}
              />
              <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full border  bg-red-700">
                  {post ? "Update" : "Submit"}
              </Button>
          </div>
      </form>
  );
}

export default PostForm