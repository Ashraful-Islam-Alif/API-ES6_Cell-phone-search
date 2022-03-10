const phoneInfo = document.getElementById('phone-info')
const phoneDetailInfo = document.getElementById('phone-detail-info')
const error = document.getElementById('error')
const loadPhone = () => {
    const inputField = document.getElementById('input-search')
    const inputText = inputField.value
    inputField.value = ''
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data))
}
const displayPhone = infodata => {

    error.textContent = ''
    phoneInfo.textContent = ''
    phoneDetailInfo.textContent = ''
    if (infodata.status == false) {
        error.innerText = 'Not found'
    }
    else {
        const phoneData = infodata.data
        let count = 0

        for (const info of phoneData) {
            const div = document.createElement('div')
            div.className = 'col-lg-4 col-sm-12'
            div.innerHTML = `
            <div class="card mb-3 p-2" rounded-3 bg-success bg-opacity-25 style="width: 18rem;">
                <img src="${info.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${info.phone_name}</h5>
                    <p class="card-text">${info.brand}</p>
                    <button onclick= "loadDetail('${info.slug}')" class="btn btn-success">Detail Info</button>
                </div>
            </div>
            `
            phoneInfo.appendChild(div)
            count++
            if (count === 20) {
                break;
            }
        }
    }
}

const loadDetail = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetail(data.data))
}

const displayDetail = (detailInfo) => {
    phoneDetailInfo.textContent = ''
    error.textContent = ''
    document.documentElement.scrollTop = 0;
    const releaseDates = detailInfo.releaseDate
    let otherInfo = detailInfo?.others

    let text = ''
    if (releaseDates == '') {
        text = 'No release date found'
    }
    else {
        text = releaseDates
    }

    const div = document.createElement('div')
    div.className = 'col-lg-12 col-sm-12 d-flex justify-content-center align-items-center'


    if (otherInfo === undefined) {
        div.innerHTML = `
    <div class="card mb-2 p-2"  style="max-width: 540px;">
        <div class="row g-0 d-flex align-items-center">
            <div class="col-md-4">
                <img src="${detailInfo.image}" class="card-img-top" alt="...">
            </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${text}</h5>
                        <p class="card-text">
                        <h5>Main Features:</h5>
                        <h6>Storage: ${detailInfo.mainFeatures.storage}</h6>
                        <h6>DisplaySize: ${detailInfo.mainFeatures.displaySize}</h6>
                        <h6>Chipset Features: ${detailInfo.mainFeatures.chipSet}</h6>
                        <h6>Memory: ${detailInfo.mainFeatures.memory}</h6>
                        <h6>Sensors: ${detailInfo.mainFeatures.sensors}</h6>
                        <h5>Others: ${detailInfo.others ? text : 'Not found'}</h5>


                        </p>
                    </div>
                </div>

        </div>
    </div>
        `
    }
    else {
        div.innerHTML = `
    <div class="card mb-2 p-2"  style="max-width: 540px;">
        <div class="row g-0 d-flex align-items-center">
            <div class="col-md-4">
                <img src="${detailInfo.image}" class="card-img-top" alt="...">
            </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${text}</h5>
                        <p class="card-text">
                        <h5>Main Features:</h5>
                        <h6>Storage: ${detailInfo.mainFeatures.storage}</h6>
                        <h6>DisplaySize: ${detailInfo.mainFeatures.displaySize}</h6>
                        <h6>Chipset Features: ${detailInfo.mainFeatures.chipSet}</h6>
                        <h6>Memory: ${detailInfo.mainFeatures.memory}</h6>
                        <h6>Sensors: ${detailInfo.mainFeatures.sensors}</h6>
                        <h5>Others:</h5>
                        <h6>WLAN: ${text}</h6>
                        <h6>Bluetooth: ${detailInfo.others.Bluetooth}</h6>
                        <h6>GPS: ${detailInfo.others.GPS}</h6>
                        <h6>NFC: ${detailInfo.others.NFC}</h6>
                        <h6>Radio: ${detailInfo.others.Radio}</h6>
                        <h6>USB: ${detailInfo.others.USB}</h6>
                        </p>
                    </div>
                </div>
            
        </div>
    </div>
        `
    }
    phoneDetailInfo.appendChild(div)


}

