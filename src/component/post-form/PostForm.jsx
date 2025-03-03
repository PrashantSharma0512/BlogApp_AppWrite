import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, RTE, Select } from '../index';
import appwriteService from '../../appWrite/configDB';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';

function PostForm({ post }) {
  const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.$id || '',
      content: post?.content || '',
      status: post?.status || 'active',
      featuredImage: post?.featuredImage || '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const toast = useToast();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const simulateProgress = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, 100);
  };

  // const submit = async (data) => {
  //   setLoading(true);
  //   simulateProgress();

  //   try {
  //     let fileId = post?.featuredImage || ''; // Preserve existing image if no new image is uploaded

  //     if (data.image?.[0]) {
  //       const file = await appwriteService.uploadFile(data.image[0]);
  //       fileId = file?.$id || '';

  //       if (post?.featuredImage) {
  //         await appwriteService.deleteFile(post.featuredImage);
  //       }
  //     }

  //     const postData = {
  //       ...data,
  //       featuredImage: fileId,
  //       userId: userData.$id,
  //     };

  //     let dbpost;
  //     if (post) {
  //       dbpost = await appwriteService.updatePost(post.$id, postData);
  //     } else {
  //       dbpost = await appwriteService.createPost(postData);
  //     }

  //     if (dbpost) {
  //       toast({
  //         title: 'Success',
  //         position: 'top-right',
  //         description: `Post ${post ? 'updated' : 'created'} successfully!`,
  //         status: 'success',
  //         duration: 5000,
  //         isClosable: true,
  //       });
  //       navigate(`/post/${dbpost.$id}`);
  //     }
  //   } catch (error) {
  //     console.error('Error submitting post:', error);
  //     await appwriteService.deleteFile(post.featuredImage);
  //     toast({
  //       title: 'Error',
  //       position: 'top-right',
  //       description: 'Something went wrong while submitting the post.',
  //       status: 'error',
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   } finally {
  //     setLoading(false);
  //     setProgress(100);
  //   }
  // };

  const submit = async (data) => {
    setLoading(true);
    simulateProgress();

    let newFileId = null; 

    try {
        let fileId = post?.featuredImage || ''; 

        if (data.image?.[0]) {
            // Upload new image
            const file = await appwriteService.uploadFile(data.image[0]);
            newFileId = file?.$id || '';
            fileId = newFileId;

            // Delete old image only after successful upload
            if (post?.featuredImage) {
                await appwriteService.deleteFile(post.featuredImage);
            }
        }

        const postData = {
            ...data,
            featuredImage: fileId,
            userId: userData.$id,
        };

        let dbpost;
        if (post) {
            dbpost = await appwriteService.updatePost(post.$id, postData);
        } else {
            dbpost = await appwriteService.createPost(postData);
        }

        if (dbpost) {
            toast({
                title: 'Success',
                position: 'top-right',
                description: `Post ${post ? 'updated' : 'created'} successfully!`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            navigate(`/post/${dbpost.$id}`);
        }
    } catch (error) {
        console.error('Error submitting post:', error);

        // If a new image was uploaded but post creation failed, delete it
        if (newFileId) {
            await appwriteService.deleteFile(newFileId);
        }

        toast({
            title: 'Error',
            position: 'top-right',
            description: 'Something went wrong while submitting the post.',
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    } finally {
        setLoading(false);
        setProgress(100);
    }
};

  const slugTransform = useCallback((value) => {
    return value
      ?.trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]/g, '-')
      .replace(/\s/g, '-');
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="relative">
      {loading && (
        <div
          className="fixed top-0 left-0 h-1 bg-blue-500 transition-all duration-300 z-50"
          style={{ width: `${progress}%` }}
        ></div>
      )}

      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap md:flex-nowrap">
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

        <div className="w-full md:w-1/3 px-2 mt-6 md:mt-0">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register('image')}
          />
          {post?.featuredImage && (
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
            disabled={loading}
          >
            {loading ? 'Submitting...' : post ? 'Update' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;