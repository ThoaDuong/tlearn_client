import Swal from "sweetalert2"

export const alertAddNewSuccess= (name: string) => {
    Swal.fire({
        icon: "success",
        html: `Added <strong>${name}</strong> successful`,
        timer: 3000,
        position: "top-end",
        showConfirmButton: false,
    })
}

export const alertUpdateSuccess = (name: string) => {
    Swal.fire({
        icon: "success",
        html: `Updated <strong>${name}</strong> successful`,
        timer: 3000,
        position: "top-end",
        showConfirmButton: false,
    })
}

export const alertDeleteSuccess = (name: string) => {
    Swal.fire({
        icon: "success",
        html: `Deleted <strong>${name}</strong> successful`,
        timer: 3000,
        position: "top-end",
        showConfirmButton: false,
    })
}

export const alertDeleteGroupError = (groupName: string, listVocaWordStr: string) => {
    Swal.fire({
        icon: 'error',
        title: `Group "${groupName}" cannot be deleted!`,
        text: `These vocabularies remain in this group: ${listVocaWordStr}`,
        confirmButtonText: 'Ok'
      })
}

export const alertConfirmDelete = (name: string, callback: any) => {
    Swal.fire({
        icon: 'warning',
        title: `Are you sure you want to delete this "${name}"?`,
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel please!"
    }).then((result) => {
        callback(result.isConfirmed, name);
    })
}

export const alertLoseGame = (point: number) => {
    Swal.fire({
        icon: 'error',
        title: 'Opps! You lose.',
        html: ` Your final score is <strong>${point}</strong> points.`
    })
}