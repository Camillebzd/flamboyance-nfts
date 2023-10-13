// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Flamboyant is ERC721 {
    using Strings for uint256;

    uint256 private _nextTokenId;
    mapping(uint256 => string) public tokenIdToUsername;

    constructor()
        ERC721("Flamboyant", "FLB")
    {}

    function generateSVG(string memory userName) internal pure returns (string memory) {
        bytes memory svg = abi.encodePacked(
            '<svg id="e6UcuzIi9431" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" width="300" height="300">',
            '<rect width="100%" height="100%" fill="black" /><defs><linearGradient id="e6UcuzIi9432-fill" x1="0" y1="0.5" x2="1" y2="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)"><stop id="e6UcuzIi9432-fill-0" offset="0%" stop-color="rgba(10,90,193,0.86)"/><stop id="e6UcuzIi9432-fill-1" offset="100%" stop-color="rgba(2,184,205,0.86)"/></linearGradient><linearGradient id="e6UcuzIi9433-fill" x1="0" y1="0" x2="1" y2="1" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)"><stop id="e6UcuzIi9433-fill-0" offset="0%" stop-color="#0a5ac1"/><stop id="e6UcuzIi9433-fill-1" offset="100%" stop-color="#02b8cd"/></linearGradient><linearGradient id="e6UcuzIi9433-stroke" x1="0" y1="0.5" x2="1" y2="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)"><stop id="e6UcuzIi9433-stroke-0" offset="0%" stop-color="#0a5ac1"/><stop id="e6UcuzIi9433-stroke-1" offset="100%" stop-color="#02b8cd"/></linearGradient><linearGradient id="e6UcuzIi9434-fill" x1="0" y1="0" x2="1" y2="1" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)"><stop id="e6UcuzIi9434-fill-0" offset="0%" stop-color="#0a5ac1"/>',
            '<stop id="e6UcuzIi9434-fill-1" offset="100%" stop-color="#02b8cd"/></linearGradient><linearGradient id="e6UcuzIi9434-stroke" x1="0" y1="0.5" x2="1" y2="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)"><stop id="e6UcuzIi9434-stroke-0" offset="0%" stop-color="#0a5ac1"/><stop id="e6UcuzIi9434-stroke-1" offset="100%" stop-color="#02b8cd"/></linearGradient><linearGradient id="e6UcuzIi9435-fill" x1="0" y1="0" x2="1" y2="1" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)"><stop id="e6UcuzIi9435-fill-0" offset="0%" stop-color="#0a5ac1"/><stop id="e6UcuzIi9435-fill-1" offset="100%" stop-color="#02b8cd"/></linearGradient><linearGradient id="e6UcuzIi9435-stroke" x1="0" y1="0.5" x2="1" y2="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)"><stop id="e6UcuzIi9435-stroke-0" offset="0%" stop-color="#0a5ac1"/><stop id="e6UcuzIi9435-stroke-1" offset="100%" stop-color="#02b8cd"/></linearGradient><linearGradient id="e6UcuzIi9436-fill" x1="0" y1="0" x2="1" y2="1" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)"><stop id="e6UcuzIi9436-fill-0" offset="0%" stop-color="#0a5ac1"/><stop id="e6UcuzIi9436-fill-1" offset="100%" stop-color="#02b8cd"/></linearGradient><linearGradient id="e6UcuzIi9436-stroke" x1="0" y1="0.5" x2="1" y2="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)"><stop id="e6UcuzIi9436-stroke-0" offset="0%" stop-color="#0a5ac1"/><stop id="e6UcuzIi9436-stroke-1" offset="100%" stop-color="#02b8cd"/></linearGradient><linearGradient id="e6UcuzIi9437-fill" x1="0" y1="0.5" x2="1" y2="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)"><stop id="e6UcuzIi9437-fill-0" offset="0%" stop-color="#0a5ac1"/><stop id="e6UcuzIi9437-fill-1" offset="100%" stop-color="#02b8cd"/>',
            '</linearGradient></defs><path d="M42.054725,0L89.341619,57.158782l13.585916-35.60447L150,90.889332l67.705103,7.027198L300,217.378897v82.621101h-64.961142L192.95375,133.59908h-42.95375L115.576491,80.114295L89.341619,111.970926L0,26.23911v-26.239112L42.054725,0Z" transform="translate(0 0.000002)" fill="url(#e6UcuzIi9432-fill)" stroke-width="0.6"/><line x1="-9.376805" y1="-53.778739" x2="9.376805" y2="53.778739" transform="matrix(.936762-.349968 0.349968 0.936762 170.466904 235.704119)" fill="url(#e6UcuzIi9433-fill)" stroke="url(#e6UcuzIi9433-stroke)" stroke-width="3"/><line x1="-9.376805" y1="-53.778739" x2="9.376805" y2="53.778739" transform="matrix(.831686-.294597 0.149928 0.423265 177.970025 59.532623)" fill="url(#e6UcuzIi9434-fill)" stroke="url(#e6UcuzIi9434-stroke)" stroke-width="3"/><line x1="-9.376805" y1="-53.778739" x2="9.376805" y2="53.778739" transform="matrix(.866177-.499737 0.377324 0.654004 258.466904 94.704119)" fill="url(#e6UcuzIi9435-fill)" stroke="url(#e6UcuzIi9435-stroke)" stroke-width="3"/><line x1="-9.376805" y1="-53.778739" x2="9.376805" y2="53.778739" transform="matrix(.866177-.499737 0.275562 0.477622 27.926428 74.84698)" fill="url(#e6UcuzIi9436-fill)" stroke="url(#e6UcuzIi9436-stroke)" stroke-width="3"/><text dx="0" dy="0" font-family="&quot;e6UcuzIi9431:::Roboto&quot;" font-size="15" font-weight="400" transform="translate(21.229035 224.091229)" fill="url(#e6UcuzIi9437-fill)" stroke-width="0"><tspan y="0" font-weight="400" stroke-width="0"><![CDATA[',
            'FLAMBOYANCE',
            ']]></tspan></text><text dx="0" dy="0" font-family="&quot;e6UcuzIi9431:::Roboto&quot;" font-size="15" font-weight="400" transform="translate(21.229035 201.091229)" fill="#f9f9fa" stroke-width="0"><tspan y="0" font-weight="400" stroke-width="0"><![CDATA[',
            'TEAM ',
            ']]></tspan></text><text dx="0" dy="0" font-family="&quot;e6UcuzIi9431:::Roboto&quot;" font-size="15" font-weight="400" transform="translate(21.229035 275.091229)" fill="#f9f9fa" stroke-width="0"><tspan y="0" font-weight="400" stroke-width="0"><![CDATA[',
            userName,
            ']]></tspan></text> ',
            '</svg>'
        );

        return string(
            abi.encodePacked(
                "data:image/svg+xml;base64,",
                Base64.encode(svg)
            )
        );
    }

    // overide the uri fct, create the uri here cause it's view
    function tokenURI(uint256 tokenId) public view override  returns (string memory) {
        string storage userName = tokenIdToUsername[tokenId];
        bytes memory dataURI = abi.encodePacked(
            '{',
                '"name": "Flamboyance ticket #', tokenId.toString(), '", ',
                '"description": "This flamboyance ticket is a cool svg created from on-chain metadatas!", ',
                '"image": "', generateSVG(userName), '" '
            '}'
        );
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(dataURI)
            )
        );
    }

    function safeMint(string calldata userName) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        tokenIdToUsername[tokenId] = userName;
        return tokenId;
    }
}