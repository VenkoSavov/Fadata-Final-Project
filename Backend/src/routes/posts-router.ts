import { Router } from 'express';
import { AppError } from '../model/errors';
import { PostRepository} from '../dao/mongo-repository';
import * as indicative from 'indicative';
import { verifyToken } from './verify-token';


const router = Router();

router.get('/', (req, res, next) =>
    (<PostRepository>req.app.locals.postRepo).findAll()
        .then(posts => res.json(posts))
        .catch(next));

router.get('/:id', async (req, res, next) => {
    // validate id
    try {
        const id = req.params.id;
        await indicative.validator.validate({ id }, {
            id: 'required|regex:^[0-9a-fA-F]{24}$'
        });
    } catch (err) {
        next(new AppError(400, err.message, err));
        return;
    }
    // find post
    try {
        const found = await (<PostRepository>req.app.locals.postRepo).findById(req.params.id)
        res.json(found); //200 OK with deleted post in the body
    } catch (err) {
        next(err);
    }

});
 
router.post('/', verifyToken,  function (req, res, next) {
    // validate new post
    const newPost = req.body;
    indicative.validator.validate(newPost, {
        _id: 'regex:^[0-9a-fA-F]{24}$',
        // author: 'required|string|min:3|max:30',
        text: 'string|max:512',
        // authorId: 'required|regex:^[0-9a-fA-F]{24}$',s
        date: 'required',
        timeFrom: 'required',
        timeTo: 'required',
        imageUrl: 'url',
        kidsNames: 'array',
        'categories.*': 'string',
        kidsAge: 'array',
        'keywords.*': 'string',
    }).then(async () => {
        // create post in db
        try {

            // Create new Post
            const created = await(<PostRepository>req.app.locals.postRepo).add(newPost);

            res.status(201).location(`/api/posts/${newPost.id}`).json(newPost);
        } catch (err) {
            next(err);
        }
    }).catch(err => next(new AppError(400, err.message, err)));
});

router.put('/:id', async function (req, res, next) {
    // validate edited post
    const post = req.body;
    try {
        await indicative.validator.validate(post, {
            _id: 'required|regex:^[0-9a-fA-F]{24}$',
            // author: 'required|string|min:3|max:30',
            text: 'string|max:512',
            // authorId: 'required|regex:^[0-9a-fA-F]{24}$',s
            date: 'required',
            timeFrom: 'required',
            timeTo: 'required',
            imageUrl: 'url',
            kidsNames: 'array',
            'categories.*': 'string',
            kidsAge: 'array',
            'keywords.*': 'string',
            isAccepted: 'boolean'
        });
    } catch (err) {``
        next(new AppError(400, err.message, err));
        return;
    }

    try {
        const postId = req.params.id;

        if (postId !== post._id) {
            next(new AppError(400, `IDs in the URL and message body are different.`));
            return;
        }
        const found = await (<PostRepository>req.app.locals.postRepo).findById(req.params.id);
        if (post.authorId && post.authorId.length > 0 && found.authorId !== post.authorId) {
            throw new AppError(400, `Can not change Post's author.`);
        }
        // _id and authorId are unmodifiable
        post._id = found._id;
        post.authorId = found.authorId;
        const updated = await (<PostRepository>req.app.locals.postRepo).edit(post);
        res.json(updated); //200 OK with post in the body
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async function (req, res, next) {
    // validate id
    try {
        const id = req.params.id;
        await indicative.validator.validate({ id }, {
            id: 'required|regex:^[0-9a-fA-F]{24}$'
        });
    } catch (err) {
        next(new AppError(400, err.message, err));
        return;
    }
    try {
        const postId = req.params.id;
        const deleted = await (<PostRepository>req.app.locals.postRepo).deleteById(postId);
        res.json(deleted); //200 OK with deleted post in the body
    } catch (err) {
        next(err);
    }
});

export default router;
 