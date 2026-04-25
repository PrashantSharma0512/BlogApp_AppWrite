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

  const submit = async (data) => {
    setLoading(true);
    simulateProgress();

    let newFileId = null;

    try {
        let fileId = post?.featuredImage || '';

        if (data.image?.[0]) {
            const file = data.image[0];

            if (!file.type.startsWith("image/")) {
                throw new Error("Invalid file type. Please upload an image.");
            }
            if (file.size > 5 * 1024 * 1024) {
                throw new Error("File size exceeds 5MB. Please upload a smaller image.");
            }

            const uploadedFile = await appwriteService.uploadFile(file);
            newFileId = uploadedFile?.$id || '';
            fileId = newFileId;

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
                description: `Post ${post ? 'updated' : 'created'} successfully!`,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            navigate(`/post/${dbpost.$id}`);
        }
    } catch (error) {
        console.error('Error submitting post:', error);
        if (newFileId) {
            await appwriteService.deleteFile(newFileId);
        }

        toast({
            title: 'Error',
            description: error.message || 'Something went wrong while submitting the post.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
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
    <div className="relative py-8">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-1.5 bg-primary/20 z-[60]">
          <div
            className="h-full bg-primary transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap lg:flex-nowrap gap-8">
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="glass-dark p-8 rounded-[2rem] border border-white/5 space-y-6">
            <Input
              label="Title"
              placeholder="Give your story a title..."
              {...register('title', { required: true })}
            />
            <Input
              label="Slug"
              placeholder="url-slug"
              {...register('slug', { required: true })}
              onInput={(e) => {
                setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true });
              }}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1">Content</label>
              <RTE name="content" control={control} defaultValue={getValues('content')} />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 space-y-6">
          <div className="glass-dark p-8 rounded-[2rem] border border-white/5 space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-medium text-muted-foreground ml-1">Cover Image</label>
              <div className="relative group">
                <Input
                  type="file"
                  className="hidden"
                  id="image-upload"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register('image')}
                />
                <label 
                  htmlFor="image-upload" 
                  className="flex flex-col items-center justify-center w-full aspect-video rounded-2xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer overflow-hidden p-2"
                >
                  {post?.featuredImage ? (
                    <div className="w-full h-full relative">
                      <img
                        src={appwriteService.getPreview(post.featuredImage)}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-xl"
                      />
                      {!appwriteService.getPreview(post.featuredImage) && (
                         <div className="absolute inset-0 flex items-center justify-center bg-secondary rounded-xl">
                            <span className="text-muted-foreground text-xs">Image not found</span>
                         </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <span className="text-3xl">🖼️</span>
                      <p className="text-xs text-muted-foreground font-medium tracking-wide">CLICK TO UPLOAD COVER</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <Select
              options={['active', 'inactive']}
              label="Publish Status"
              {...register('status', { required: true })}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full py-4 text-base"
              disabled={loading}
            >
              {loading ? 'Processing...' : post ? 'Update Post' : 'Publish Story'}
            </Button>
          </div>
          
          <div className="glass-dark p-6 rounded-[2rem] border border-white/5">
            <h4 className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest mb-4">Tips</h4>
            <ul className="text-xs text-muted-foreground space-y-3">
              <li className="flex gap-2"><span>•</span> Use a catchy title and high quality image.</li>
              <li className="flex gap-2"><span>•</span> The slug is generated automatically but can be edited.</li>
              <li className="flex gap-2"><span>•</span> Max image size is 5MB.</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostForm;