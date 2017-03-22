/**
 * Created by Mudin on 2/12/16.
 */

//var projectId, date_from, date_to;


var pvr,

    db={
        hotspot: {},
        pvr : {}
    }

// tmp
var pvrId = 1;
if (pvrId != -1) {

    /* Get pvr using pvr_id*/
    $.get('getData.php', {
        req: "getPvr",
        data: {
            pvr_id: pvrId
        }
    }, function (data) {
        pvr = data;
        DrawPvr();
    }, 'json');
}



function DrawPvr(){

    var path=pvr.options.pvrPath;

    // ajax request is here
    var dest_path='project/'+path_id+'/pvr/'+pvr.id+'/'+date_from+'_'+date_to;
    var today = new Date();
    var dd = today.getDate(),mm = today.getMonth()+ 1, yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = yyyy+'-'+mm+'-'+dd;
    if(date_to==today){
        generate_heatmap(path,dest_path);
    }
    else {
        $.ajax({
            url: dest_path,
            type: 'HEAD',
            error: function () {
                generate_heatmap(path, dest_path);
            },
            success: function () {

                $.ajax({
                    url: dest_path+'/heatmap.jpg',
                    type: 'HEAD',
                    error: function () {
                        $('#pvr_img').append('<img id="pvr-img" src="' + path + '/pano_resize.jpg"></img>');
                    },
                    success: function () {
                        $('#pvr_img').append('<img id="pvr-img" src="' + dest_path + '/heatmap.jpg"></img>');
                    }
                });
            }
        });
    }

}

function generate_heatmap(path,dest_path){
    $.ajax({
        async: false,
        type: 'post',
        url: 'php/heatMap_generate.php',
        data: {
            req: "generateHeatmap",
            data: {
                pvr_id: pvr.id,
                date_from:date_from,
                date_to:date_to
            }
        },
        success: function (data) {
            if(data=='success') {
                $('#pvr_img').append('<img id="pvr-img" src="' + dest_path + '/heatmap.jpg"></img>');

                //embedpano({
                //    target: "main-area",
                //    id: "projectViewKrpano",
                //    bgcolor: "#FFFFFF",
                //    html5: "only",
                //    js: "js/krpano.js",
                //    xml: path + "/heatmap.xml"
                //});


            }
            else
            {
                $('#pvr_img').append('<img id="pvr-img" src="' + path + '/pano_resize.jpg"></img>');
            }
        },
        beforeSend: function (jqxhr) {
            myjqxhr = jqxhr;
            $('.loadingContainer').removeClass('hidden');
        },
        complete: function () {
            myjqxhr = null;
            $('.loadingContainer').addClass('hidden');
        }
    });
}