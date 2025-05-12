document.addEventListener('alpine:init', () => {
    Alpine.store('authors', {
        list: ['Alice', 'Bob', 'Charlie'],
        
        add(author) {
            if (author && !this.list.includes(author)) {
                this.list = [...this.list, author];
                return true;
            }
            return false;
        },
        
        remove(author) {
            this.list = this.list.filter(a => a !== author);
        }
    });

    Alpine.data('galleryApp', () => ({
        photos: [],
        newPhoto: { title: '', description: '', author: '' },
        selectedPhoto: null,
        image_count: 0,
        newAuthorName: '',
        successMessage: false,
        errorMessage: false,

        // Getter pour accéder à la liste des auteurs
        get authors() {
            return Alpine.store('authors').list;
        },

        // Fonction pour gérer l'ajout d'auteur
        handleAuthorSubmit() {
            if (Alpine.store('authors').add(this.newAuthorName)) {
                this.successMessage = true;
                this.errorMessage = false;
                this.newAuthorName = '';
                setTimeout(() => this.successMessage = false, 2000);
            } else {
                this.errorMessage = true;
                this.successMessage = false;
            }
        },

        // Fonction pour ajouter une nouvelle photo
        addPhoto() {
            if (this.newPhoto.title && this.newPhoto.author) {
                this.photos.push({
                    title: this.newPhoto.title,
                    description: this.newPhoto.description,
                    author: this.newPhoto.author,
                    url: `https://boringapi.com/api/v1/static/photos/${(this.image_count % 300) + 1}.jpeg`,
                    id: this.image_count++
                });
                this.newPhoto = { title: '', description: '', author: '' };
            }
        },

        // Fonction pour supprimer un auteur
        deleteAuthor(author) {
            if (confirm(`Supprimer l'auteur ${author} ?`)) {
                Alpine.store('authors').remove(author);
                this.photos = this.photos.filter(photo => photo.author !== author);
            }
        },

        // Fonction pour ouvrir une photo en modal
        openModal(photo) {
            this.selectedPhoto = photo;
        },

        // Fonction pour fermer la modal
        closeModal() {
            this.selectedPhoto = null;
        },

        // Fonction pour obtenir le nombre de photos par auteur
        getPhotoCount(author) {
            return this.photos.filter(p => p.author === author).length;
        }
    }));
});