import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, RTE, Select } from '../index';
import appwriteService from '../../appWrite/configDB';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
  const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.$id || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Progress state

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Simulate progress for visual feedback
  const simulateProgress = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, 100); // Increment progress every 100ms
  };

  const submit = async (data) => {
    setLoading(true);
    simulateProgress(); // Start progress simulation
    try {
      if (post) {
        const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
        if (file) {
          appwriteService.deleteFile(post.featuredImage);
        }
        const dbpost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });
        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);
        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbpost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
          });
          if (dbpost) {
            navigate(`/post/${dbpost.$id}`);
          }
        }
      }
      setLoading(false)
    } catch (error) {
      console.error('Error submitting post:', error);
    }
    setLoading(false);
    setProgress(100); // Ensure progress completes on success/failure
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]/g, '-')
        .replace(/\s/g, '-');
    }
    return '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title, { shouldValidate: true }));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <div className="relative">
      {/* Top Progress Bar */}
      {loading && (
        <div
          className="fixed top-0 left-0 h-1 bg-blue-500 transition-all duration-300 z-50"
          style={{ width: `${progress}%` }}
        ></div>
      )}

      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap md:flex-nowrap">
        {/* Main Content Section */}
        <div className="w-full md:w-2/3 px-2">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register('title', { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register('slug', { required: true })}
            onInput={(e) => {
              setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
          />
          <RTE label="Content :" name="content" control={control} defaultValue={getValues('content')} />
        </div>

        {/* Sidebar Section */}
        <div className="w-full md:w-1/3 px-2 mt-6 md:mt-0">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register('image', { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getPreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg w-full"
              />
            </div>
          )}
          <Select
            options={['active', 'inactive']}
            label="Status"
            className="mb-4"
            {...register('status', { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? 'bg-green-500' : 'bg-blue-700'}
            className="w-full border"
            disabled={loading} // Disable button during submission
          >
            {loading ? 'Submitting...' : post ? 'Update' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
