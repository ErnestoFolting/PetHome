﻿using backendPetHome.API.Attributes;
using backendPetHome.API.Controllers.Abstract;
using backendPetHome.API.Hubs;
using backendPetHome.BLL.DTOs.AdvertDTOs;
using backendPetHome.BLL.Services.Interfaces;
using backendPetHome.DAL.Specifications.QueryParameters;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace backendPetHome.API.Controllers
{
    [Route("api/[controller]")]
    public class AdvertsController : BaseController
    {
        private readonly IAdvertService _advertService;
        private readonly IPerformerSelectionHub _hub;
        public AdvertsController(IAdvertService advertService, IPerformerSelectionHub hub)
        {
            _advertService = advertService;
            _hub = hub;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdvertDTO>>> GetAdverts([FromQuery] QueryStringParameters parameters)
        {
            var advertsAndCount = await _advertService.getAdverts(parameters);
            Response.Headers.Add("X-Pagination-Total-Count", JsonConvert.SerializeObject(advertsAndCount.totalCount));
            return Ok(advertsAndCount.fitAdvertsDTO);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AdvertDTO>> Get(int id)
        {
            return Ok(await _advertService.getAdvertById(id));
        }

        [UserId]
        [HttpPost]
        public async Task<ActionResult> Post([FromForm] AdvertCreateRedoDTO advertToAdd, IFormFile petPhoto)
        {
            var possiblePerformers = await _advertService.addAdvert(advertToAdd, UserId, petPhoto);
            if (possiblePerformers.possiblePerformersIds != null) await _hub.Send(possiblePerformers.possiblePerformersIds, possiblePerformers.advertDTO);
            return Ok();
        }

        [UserId]
        [HttpPut("finish/{advertId}")]
        public async Task<ActionResult> MarkAsFinished(int advertId)
        {
            await _advertService.MarkAsFinished(advertId, UserId);
            return Ok();
        }

        [UserId]
        [HttpDelete("{advertId}")]
        public async Task<ActionResult> deleteAdvert(int advertId)
        {
            await _advertService.deleteAdvert(advertId, UserId);
            return Ok();
        }
    }
}
